import { ForbiddenException } from "@nestjs/common"


export function checkUserPermission(requestingUserId: number, targetUserId: number): void {
    if (requestingUserId !== targetUserId) {
        throw new ForbiddenException('You are not allowed to access this resource, check your permissions');
    }
}