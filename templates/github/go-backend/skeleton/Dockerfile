FROM registry.access.redhat.com/ubi9/go-toolset:latest as runner

COPY go.mod ./
RUN go mod download

COPY *.go ./

RUN go build -o ./main

ENV PORT ${{ values.port }}
EXPOSE ${{ values.port }}

CMD [ "./main" , "-p=8080"]
