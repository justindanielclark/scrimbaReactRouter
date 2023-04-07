import { createServer, Model, hasMany, belongsTo } from "miragejs";
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
      const van = schema.find("van", id);
      return { ...van.attrs };
    });

    this.get("/hosts/:id/details", (schema, request) => {
      const id = request.params.id;
      const hostData = schema.find("host", id);
      const ownedVans = schema.where("van", { hostId: id });
      const reviews = schema.where("review", { hostId: id });
      return { hostData, vans: ownedVans.models, reviews: reviews.models };
    });

    this.get("/hosts/:id/income", (schema, request) => {
      const id = request.params.id;
      const hostData = schema.find("host", id);
      return hostData.income;
    });

    this.get("/hosts/:id/vans", (schema, request) => {
      const id = request.params.id;
      const ownedVans = schema.where("van", { hostId: id });
      return ownedVans.models;
    });

    this.get("/hosts/:id/reviews", (schema, request) => {
      const id = request.params.id;
      const reviews = schema.where("review", { hostId: id });
      const users = {};
      reviews.models.forEach((review) => {
        if (users[review.userId] === undefined) {
          users[review.userId] = schema.find("user", review.userId);
        }
      });
      const passedUsers = [];
      for (const prop in users) {
        passedUsers.push(users[prop]);
      }
      return { reviews: reviews.models, users: passedUsers };
    });
  },
});
