
export class BaseService
{
    catchErrors(errors)
    {
        throw errors.response.data.errors || errors.response.data;
    }
}