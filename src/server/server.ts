import { createServer, Factory, Model } from "miragejs";
import vans from "./data/vans";
import hosts from "./data/hosts";
import reviews from "./data/reviews";
import users from "./data/users";

createServer({
  models: {
    review: Model,
    user: Model,
    host: Model,
    van: Model,
  },

  seeds(server) {
    vans.forEach((van) => server.create("van", van));
    hosts.forEach((host) => server.create("host", host));
    users.forEach((user) => server.create("user", user));
    reviews.forEach((review) => server.create("review", review));
  },

  routes() {
    this.namespace = "api";

    this.get("/vans", (schema, request) => {
      return schema.all("van");
    });

    this.get("/vans/:id", (schema, request) => {
      const id = request.params.id;
      return schema.find("van", id);
    });

    this.get("hosts", (schema, request) => {
      return schema.find("host", "123");
    });
  },
});
