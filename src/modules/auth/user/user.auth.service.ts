import { Injectable, 
    UnauthorizedException, 
    ConflictException 
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AccountDto } from 'modules/hr/accounts';
import { AccountsService } from 'modules/hr/accounts';
import { ErrorMessage, IFilter, ISelect } from 'src/common';
import { SignInDto, AccessInfo, AccountInfo } from './user.auth.dto';

@Injectable()
export class UserAuthService {
    constructor(

        // @Inject(forwardRef(() => AccountsService))
        private accountsService: AccountsService, 
        private jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<AccessInfo> {
        try {

            const { 
                username = '', 
                // email = '', 
                phone, password: pass 
            } = signInDto;

            // Account        
            const filters: IFilter[] = [];

            if (username) {
                filters.push({ username });
            }

            // if (email) {
            //     filters.push({ email });
            // }

            if (phone) {
                filters.push({ phone });
            }
            
            const account = await this.accountsService.findOne(filters);
            console.log('======================== UserAuthService signIn account ', 
                account)
            if (!account) {
                throw new UnauthorizedException();
                // NotFoundException
            }

            const { username: accUsername, password = '', roleId } = account;

            if (password !== pass) {
                throw new UnauthorizedException();
                // 
            }

            // Generate access token
            const jwtPayload: AccountInfo 
                = {
                // accountId
                username: accUsername, roleId
            }

            const jwtSignOption: JwtSignOptions = {
                expiresIn: '1h'
            }

            const accessToken: string 
                = await this.jwtService.signAsync(jwtPayload, jwtSignOption);

            const accessInfo: AccessInfo 
                = { access_token: accessToken };

            return accessInfo;
        } catch (err) {
            throw err;
        }
    }

    async register(accountDto: AccountDto): Promise<void> {

        try {
            // 
            const { username, phone, email } = accountDto;
    
            // Check if account existed
            const filters: IFilter[] = [
                { username },
                { email }, 
                { phone } 
            ];
            const select: ISelect = ['id'];
    
            const account: AccountDto | null
                = await this.accountsService.findOne(filters, select);
                // = await this.accountsService.findOne(findAccountOptions);
                    
            console.log('======================== account ', 
                account)

            // A salted one-way hash algorithm
            
            if (account) {
                // throw new BadRequestException(`Account ${ErrorMessage.EXISTED_POSTFIX}`);
                // throw new BadRequestException(`Account ${ErrorMessage.EXISTED_POSTFIX}`);
                throw new ConflictException(`Account ${ErrorMessage.EXISTED_POSTFIX}`);
            }
            
            // // Insert account
            await this.accountsService.insertOne(accountDto);
            
        } catch (err) {
            console.log('================== UserAuthService register err', err)
            throw err;
        }
    }
}