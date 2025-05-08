import { User } from "src/db/entities/user.entity";
import { UserResponseDto } from "src/users/dto/user-response.dto";

export function toUserResponseDto(user: User): UserResponseDto {
    const { id, name, email, phone, address, profile_img, created_at, updated_at } = user;
    return {id, name, email, phone, address, profile_img, created_at, updated_at};
}