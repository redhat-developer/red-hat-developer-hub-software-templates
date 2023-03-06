FROM registry.access.redhat.com/ubi8/dotnet-70:7.0 as builder
WORKDIR /opt/app-root/src
COPY --chown=1001 . .
RUN dotnet publish ./app -c Release


FROM registry.access.redhat.com/ubi8/dotnet-70:7.0 as runner
ENV ASPNETCORE_URLS=http://*:${{ values.port }}
EXPOSE ${{ values.port }}
COPY --from=builder /opt/app-root/src/app/bin /opt/app-root/src/bin
WORKDIR /opt/app-root/src/bin/Release/net7.0/publish
CMD ["dotnet", "app.dll"]