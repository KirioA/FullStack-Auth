import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT токен доступа' })
    token: string;
} 