Spring Boot RSocket Service for Deno
====================================

# Example usage

* RSocket service controller:

```java
@Controller
@MessageMapping("UserService")
public class UserServiceController {

    @MessageMapping("findById")
    public Mono<User> findById(Integer id) {
        return Mono.just(new User(1, "linux_china"));
    }
}
```

* Deno client

```typescript
import {buildServiceStub, RSocketConnector} from "https://deno.land/x/rsocket/mod.ts"
import {Publisher, publisherToAsyncIterator} from "https://deno.land/x/rsocket/reactivestreams/mod.ts";

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

let user = await userService.findById(1);
```

* Deno test

```
$ deno test --allow-net deno_client.ts
```

# References

* Deno RSocket: https://deno.land/x/rsocket
* Deno: https://deno.land/
* Spring RSocket: https://docs.spring.io/spring/docs/5.2.7.RELEASE/spring-framework-reference/web-reactive.html#rsocket
