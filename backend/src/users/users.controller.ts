import { Body, Controller ,Post,Get,Put, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    
    @Post('/create')
    createNewUser(@Body() dto: createUserDto) {
        return this.usersService.create(dto)
    }
    @Put('/update/:id')
    updateUser(@Param('id') id: string, @Body() dto: createUserDto) {
        return this.usersService.update(id,dto)
    }
    @Get('/all')
    getUsers() {
        return this.usersService.findAll();
    }
    @Get('/:id')
    getUser(@Param('id') id:string) {
        return this.usersService.findOneById(id);
    }
    @Post('/delete/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

}
