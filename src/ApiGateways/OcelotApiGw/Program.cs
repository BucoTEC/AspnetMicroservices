using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy", builder => builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed((hosts) => true));
});

builder.Configuration.AddJsonFile($"ocelot.{builder.Environment}.json", true, true);

builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// app.MapGet("/", () => "Hello World!");
app.UseCors("CORSPolicy");

await app.UseOcelot();

app.Run();
