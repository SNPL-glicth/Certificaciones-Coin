import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Session } from '../entities/session.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const savedUser = await this.userRepository.save(user);

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto, req: any) {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Crear sesión
    const session = await this.createSession(user, token, req);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
        ipAddress: session.ipAddress,
      },
    };
  }

  async createSession(user: User, token: string, req: any): Promise<Session> {
    // Invalidar sesiones anteriores del usuario (opcional)
    await this.sessionRepository.update(
      { userId: user.id, isActive: true },
      { isActive: false }
    );

    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    // Crear nueva sesión (24 horas de duración)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const session = this.sessionRepository.create({
      token,
      userId: user.id,
      ipAddress,
      userAgent,
      expiresAt,
      lastActivity: new Date(),
    });

    return await this.sessionRepository.save(session);
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub, isActive: true },
    });
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async logout(token: string) {
    // Invalidar la sesión
    const session = await this.sessionRepository.findOne({
      where: { token, isActive: true },
    });

    if (session) {
      session.isActive = false;
      await this.sessionRepository.save(session);
    }

    return { message: 'Sesión cerrada exitosamente' };
  }

  async getUserSessions(userId: number) {
    return await this.sessionRepository.find({
      where: { userId, isActive: true },
      order: { lastActivity: 'DESC' },
      select: ['id', 'ipAddress', 'userAgent', 'lastActivity', 'expiresAt'],
    });
  }

  async updateSessionActivity(token: string) {
    await this.sessionRepository.update(
      { token, isActive: true },
      { lastActivity: new Date() }
    );
  }

  async cleanExpiredSessions() {
    await this.sessionRepository.update(
      { expiresAt: new Date(), isActive: true },
      { isActive: false }
    );
  }
}