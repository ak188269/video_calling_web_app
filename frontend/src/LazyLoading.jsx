import loadable from "@loadable/component";
export const Home = loadable(
    ()=>import("./components/home/Home"),
    {
    fallback : <div>it is fallback</div>
    }
);
