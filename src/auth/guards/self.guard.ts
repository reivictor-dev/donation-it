import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";


@Injectable()
export class SelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const userId = request.user.userId;
        const paramId = parseInt(request.params.id, 10);

        if (!userId || userId !== paramId) {
            throw new ForbiddenException("Unauthorized access, you can only access your own data");
        }

        return true;
        
    }
}