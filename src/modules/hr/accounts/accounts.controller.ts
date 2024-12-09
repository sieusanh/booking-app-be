import { 
    Controller, Body, Query, Post, Get, 
    Param, HttpCode, HttpException, HttpStatus, NotFoundException 
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { SWAGGER_TAG_ACCOUNT, API_BODY_EXAMPLE } from './accounts.constant';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { RolesGuard, AuthGuard } from 'common/guards';
import { Roles } from 'common/decorator';
import { HttpErrorMessage, ICriteria } from 'common/constant';
import { QueryParams, QueryParser } from 'common/http';

@Controller()
@ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header'
})
@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags(SWAGGER_TAG_ACCOUNT)
export class AccountsController {


    constructor(
        protected service: AccountsService,
        private queryParser: QueryParser

        // protected accountDto: AccountDto, 
        // protected account: Account,
        // @Inject('ApiBodyExample') apiBodyExample: Object
    ) { 
        // this.setApiBodyExample(apiBodyExample);
    }   

    @Post()
    // @Roles([ROLES.ADMIN])
    // @Header('Cache-Control', 'none')
    @HttpCode(HttpStatus.CREATED)
    // @RolesGuard(['admin'])
    @ApiOperation({ summary: `Create` })
    @ApiBody({
        description: 'Body',
        // examples: this?.['apiBodyExample'],
        examples: {
            'Case 1': {
                value: {
                    username: 'username_1',
                    email: 'user1@gmail.com',
                    password: 'Abc@123',
                    name: 'Username 1',
                    phone: '0123456789',
                    avatar: 'a.png',
                    gender: 'FEMALE',
                    roleId: 'role1',
                    // lastLoginAt
                }
            },
            // 'Case 2': {
            //     // value: getSchemaPath(this?.['apiBodyExample']!)
            //     value: undefined
            // }
        }
    })
    async create(
        @Body()
        accountDto: AccountDto,
    ) {
        try {
            const result = await this.service
                .insertOne(accountDto);

            return result;
            // res.status(HttpStatus.CREATED).json(data);
        } catch (err) {
        console.log('===================== AccountsController create err ', err)

            throw new HttpException(
                HttpErrorMessage.CREATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: `findOne` })
    @UseGuards(AuthGuard)
    async findById(
        @Param('id') id: string,
        // @Res({ passthrough: true }) res: Response
    ) {
        try {

            const data = await this.service.findById(id);

            if (!data) {
                throw new NotFoundException(
                    `Account is not found.`
                );
            }

            return data;

        } catch (err) {

            const { message, status } = err;
            let errMess: string = HttpErrorMessage.INTERNAL_SERVER_ERROR;
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

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: `findAll` })
    async findMany(
        @Query() queryParams: QueryParams,
    ) {
        try {
            const criteria: ICriteria 
                = this.queryParser.parseFindManyQuery(queryParams);

            const result 
                = await this.service.findMany(criteria);

            return result;
        } catch (err) {
            console.log('=============== AccountsController findMany ', err);
            const { message, status } = err;
            let errMess: string = HttpErrorMessage.INTERNAL_SERVER_ERROR;
            let errStatusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    
            if (message && status) {
                errMess = message;
                errStatusCode = status;
            }

            throw new HttpException(
                errMess, 
                errStatusCode
            );
            
            /*
                throw new BadRequestException('Something bad happened', { 
                    cause: new Error(), 
                    description: 'Some error description' 
                })
                    
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'This is a custom message',
                }, HttpStatus.FORBIDDEN, {
                    cause: 'Em sai roi'
                });
            */
        }
    }

    // @Put(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @ApiOperation({ summary: `update` })
    // updateById(
    //     @Param('id') id: Id,
    //     @Body() dto: Dto,
    // ) {
    //     try {
    //         return this.service.updateById(id, dto);

    //     } catch (error) {
    //         throw new HttpException(
    //             HttpErrorMessage.UPDATE, 
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         );
    //     }
    // }

    // @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @ApiOperation({ summary: `remove` })
    // async deleteById(
    //     @Param('id') id: Id
    // ) {
    //     try {
    //         return this.service.deleteById(id);
    //     } catch (error) {
    //         throw new HttpException(
    //             HttpErrorMessage.DELETE, 
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         );
    //     }
    // }

    // @Get('*')
    // @Redirect('https://docs.nestjs.com', 302)
    // getDocs(@Query('version') version) {
    //     if (version && version === '5') {
    //         return { url: 'https://docs.nestjs.com/v5/' };
    //     }
    // }
}
