// import { AccountDto } from './accounts.dto';
// import { EmptyValueException, MissingFieldException } from 'src/common/exceptions'
// import { ErrorMessage } from 'src/common/constant';
// import { BadRequestException } from '@nestjs/common';

// export class AccountsValidator {

//     async validateParams(params: Partial<AccountDto>) {

//         // Check common regulations
//         const insertFields = ['email', 'password'];
//         for (const [key, value] of Object.entries(params)) {

//             // Check empty value
//             if (!value) {
//                 throw new EmptyValueException(key);
//             }

//             // Check missing field
//             const index = insertFields.indexOf(key);
//             insertFields.splice(index, 1);
//         }

//         // Check missing field
//         if (insertFields.length > 0) {
//             throw new MissingFieldException(insertFields[0]);
//         }

//         // Preparing some variable
//         const {
//             email, password
//         } = params;
//         const {
//             INVALID_EMAIL,
//             INVALID_PASSWORD,
//             EMAIL_NOT_AVAILABLE
//         } = ErrorMessage;

//         /**
//          * Check valid username
//          * Minimum 8 characters
//          * Maximum 20 characters
//          * NOT CONTAINING SPECIAL CHARACTERS
//          * Available
//          * 
//          */
//         const emailPattern = /^[a-zA-Z0-9 @]{8,20}$/;
//         if (!emailPattern.test(email.trim())) {
//             throw new BadRequestException(INVALID_EMAIL);
//         }

//         const isExists = await this.InvalidValueException(email);
//         if (isExists) {
//             throw new BadRequestException(EMAIL_NOT_AVAILABLE);
//         }

//         /**
//          * Check valid password
//          * 
//          * Minimum 8 characters
//          * At least one number
//          * At least one non-alphabetic character
//          * At least one lowercase letter
//          * At least one capital letter
//          */
//         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordPattern.test(password)) {
//             throw new BadRequestException(INVALID_PASSWORD);
//         }
//     }

// }