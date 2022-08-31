FROM golang:latest as builder

WORKDIR /app
RUN GIN_MODE=release

COPY ./backend/go.mod  go.mod
COPY ./backend/go.sum  go.sum

RUN go mod download
RUN go mod verify

COPY ./backend /app

RUN go build -o todoapp


FROM golang:latest as runner
WORKDIR /app
RUN GIN_MODE=release

COPY --from=builder /app/todoapp .
COPY --from=builder /app/.env.production .env
COPY --from=builder /app/google-application-credentials.json google-application-credentials.json

CMD ["./todoapp"]