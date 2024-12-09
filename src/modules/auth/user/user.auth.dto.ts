import { AccountDto } from 'modules/hr/accounts/accounts.dto';
import { OmitType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { ID } from 'common/constant';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, Matches, IsNotEmpty } from 'class-validator';

// export class SignInDto extends PickType(
//     AccountDto, ['username', 'email', 'phone', 'password'] as const
// ) { }

@Injectable()
export class SignInDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username: string = '';

    // @ApiProperty()
    // @IsString()
    // @IsOptional()
    // @IsEmail()
    // email?: string = '';

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/^[+ 0-9]{8,18}$/)
    phone?: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string = '';
}

export class RegistryDto extends OmitType(
    AccountDto, ['lastLoginAt'] as const, 
) { }

export class AccessDto {
    access_token: string
}

export interface AccountInfo {
    username: string;
    roleId?: ID;
}

export interface AccessInfo {
    access_token: string;
    
}
