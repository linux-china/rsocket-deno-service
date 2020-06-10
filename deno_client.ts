import {buildServiceStub, RSocketConnector} from "https://deno.land/x/rsocket/mod.ts"
import {Publisher, publisherToAsyncIterator} from "https://deno.land/x/rsocket/reactivestreams/mod.ts";

const {test} = Deno;

type User = {
    id: number,
    nick: string
}

interface UserService {
    findById(id: number): Promise<User>;

    findAllUsers(type: number): Publisher<User>
}

const rsocket = await RSocketConnector.create().connect("ws://127.0.0.1:8080/rsocket");

const userService = buildServiceStub<UserService>(rsocket, "UserService")

test("UserService.findById", async () => {
    let user = await userService.findById(1);
    console.log(user);
});

test("UserService.findAllUsers", async () => {
    let users = userService.findAllUsers(1);
    for await (const user of publisherToAsyncIterator(users)) {
        console.log(user);
    }
});