import { 
    Controller, Body, Query, Post, Get, 
    Param, HttpCode, HttpException, 
    HttpStatus, NotFoundException 
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelDto } from './hotels.dto';
import { SWAGGER_TAG_HOTEL } from './hotels.constant';
import { ApiTags, ApiBearerAuth, 
    ApiHeader, ApiBody, ApiOperation 
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { RolesGuard, AuthGuard } from 'common/guards';
import { HttpErrorMessage, ICriteria, IFilter } from 'common/constant';
import { QueryParams, QueryParser } from 'common/http';

@Controller()
@ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header'
})
@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags(SWAGGER_TAG_HOTEL)
export class HotelsController {


    constructor(
        protected service: HotelsService,
        private queryParser: QueryParser
    ) { 
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
                    name: 'Hotel 1',
                    type: 'Normal',
                    phone: '0123456789',
                    city: 'Ho Chi Minh',
                    address: '12/3 A',
                    distance: '2km',
                    photos: ['a.png'],
                    title: 'Hotel 1',
                    desc: 'abc',
                    rating: 1,
                    rooms: ['Room 1'],
                    cheapestPrice: 123,
                    featured: false
                }
            }
        }
    })
    async create(
        @Body()
        hotelDto: HotelDto,
    ) {
        try {
            const result = await this.service
                .insertOne(hotelDto);

            return result;
            // res.status(HttpStatus.CREATED).json(data);
        } catch (err) {
            console.log('================= HotelsController create ', err)
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
            console.log('=============== HotelsController findMany ', err);
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

    @Get('countByCity')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: `countByCity` })
    async countByCity(
        @Query('cities') cities,
    ) {
        try {
            const filters: IFilter[] = [];

            for (const city of cities.split(',')) {
                const filter = { city };
                filters.push(filter);
            }
            const criteria: ICriteria = { filters };

            const result 
                = await this.service.countByCity(criteria);

            return result;
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

}
