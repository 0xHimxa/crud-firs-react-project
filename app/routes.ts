import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
   layout("routes/layout-auth.tsx", [
    
  
  route("createpost", "routes/create-post.tsx"),
    route('/',"routes/home.tsx"),
   
]),
  route("logout", "routes/logout.tsx"),
  route("login", "routes/login.tsx"),

] satisfies RouteConfig;
