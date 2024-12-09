import {
    Controller, Post, Body,
    HttpCode, HttpStatus, Inject, HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, getSchemaPath } from '@nestjs/swagger';
import { UserAuthService } from './user.auth.service';
import { SWAGGER_TAG_USER_AUTH } from './user.auth.constant';
import { SignInDto, RegistryDto, AccessInfo
    // AccessDto 
} from './user.auth.dto';

import { HttpErrorMessage } from 'src/common';
// import { BaseApiBody } from 'src/common/decorator';

@ApiTags(SWAGGER_TAG_USER_AUTH)
@Controller()
export class UserAuthController {   

    constructor(
        private userAuthService: UserAuthService,
        // @Inject('AccountDto') 
        // private accountDto: AccountDto,
        @Inject('ApiBodyExample') protected apiBodyExample: Object
    ) { } 

    /*
        {
            "username": "nguyenvana",
            "email": "nguyenvana@gmail.com",
            "password": "abc123@",
            "name": "Nguyễn Văn A",
            "phone": "0123456789",
            "avatar": "",
            "gender": "MALE",
            "birthDay": "",
            "salary": 0,
            "role": "MEMBER",
            "managerId": null,
            "positionId": null,
            "departmentId": null,
            "projectIds": null
        }
    */

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Account Login' })
    @ApiBody({
        description: '',
        examples: {
            'Case default': {
                value: {
                    phone: '0902083164',
                    password: 'Abc@123'
                }
            }
        }
    })
    // @ApiBody({ type: SignInDto })
    async signIn(@Body() signInDto: SignInDto): Promise<AccessInfo> {
        try {
            const res: AccessInfo = await this.userAuthService.signIn(signInDto);
            return res;
        } catch (err) {
            throw new HttpException(
                HttpErrorMessage.UNAUTHORIZED, 
                HttpStatus.UNAUTHORIZED
            );
        }
    }
 
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User account registration' })
    @ApiBody({
        // schema: {
        //     // $ref: getSchemaPath(RegistryDto)
        //     $ref: getSchemaPath(AccountDto)
        // },
        description: '',
        examples: {
            'Case default': {
                value: {
                    username: 'username1',
                    email: 'user1@gmail.com',
                    phone: '0902083164',
                    password: 'abc123',
                    fullName: 'User 1',
                    gender: 'MALE'
                }
            }
        }
    })
    async register(@Body() registryDto: RegistryDto): Promise<void> {
        try {
            await this.userAuthService.register(registryDto);

        } catch (err) {
            
            const { message, status } = err;
            let errMess: string = HttpErrorMessage.CREATE;
            let errStatusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

            if (message && status) {
                errMess = message;
                errStatusCode = status;
            }

            throw new HttpException(
                errMess, 
                errStatusCode
            );
        }
    }
}
