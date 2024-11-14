import NavigationRail from "../componets/NavigationRail";
import Graph from "../componets/Graph";
import Upload from "../componets/Upload"
import Main from "../componets/Main";
import Detect from "../componets/Detect"
import NGList from "../componets/NGList";

const HomeView = () => {
    return (
        <>
            <NavigationRail>
                <Graph />
                <Upload />
            </NavigationRail>
            <Main>
                <Detect />
                <NGList />
            </Main>
        </>
    )
}

export default HomeView