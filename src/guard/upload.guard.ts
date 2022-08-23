import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { Observable } from "rxjs"

@Injectable()
export class UploadGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const uploadConfig = this.reflector.get<string[]>('upload', context.getHandler())
    const request = context.switchToHttp().getRequest() as Request
    console.log(request.file)
    return true
  }
}
