namespace VariProduzioneApi.Endpoints;

public static class TasksEndpoints
{
    public static IEndpointRouteBuilder MapTasksEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/tasks")
            .WithTags("Tasks");

        // GET /api/tasks
        group.MapGet("/", async (Services.ITaskService service) =>
        {
            var tasks = await service.GetAllAsync();
            return Results.Ok(tasks);
        })
        .WithName("GetTasks")
        .Produces<IEnumerable<DTOs.TaskListItemDto>>(StatusCodes.Status200OK);

        // GET /api/tasks/{id}
        group.MapGet("/{id:int}", async (int id, Services.ITaskService service) =>
        {
            var task = await service.GetByIdAsync(id);
            return task is not null ? Results.Ok(task) : Results.NotFound();
        })
        .WithName("GetTaskById")
        .Produces<DTOs.TaskDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // POST /api/tasks
        group.MapPost("/", async (DTOs.CreaTaskDto dto, Services.ITaskService service) =>
        {
            var task = await service.CreateAsync(dto);
            return Results.Created($"/api/tasks/{task.Id}", task);
        })
        .WithName("CreateTask")
        .Produces<DTOs.TaskDetailDto>(StatusCodes.Status201Created);

        // PUT /api/tasks/{id}
        group.MapPut("/{id:int}", async (int id, DTOs.AggiornaTaskDto dto, Services.ITaskService service) =>
        {
            var task = await service.UpdateAsync(id, dto);
            return task is not null ? Results.Ok(task) : Results.NotFound();
        })
        .WithName("UpdateTask")
        .Produces<DTOs.TaskDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // DELETE /api/tasks/{id}
        group.MapDelete("/{id:int}", async (int id, Services.ITaskService service) =>
        {
            var deleted = await service.DeleteAsync(id);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteTask")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        // PATCH /api/tasks/{id}/assegna
        group.MapPatch("/{id:int}/assegna", async (int id, DTOs.AssegnaTaskDto dto, Services.ITaskService service) =>
        {
            var task = await service.AssegnaAsync(id, dto);
            return task is not null ? Results.Ok(task) : Results.NotFound();
        })
        .WithName("AssegnaTask")
        .Produces<DTOs.TaskDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }
}