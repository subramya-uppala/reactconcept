import Learn from "../Components/learn";
import Home from "../Components/home";
import { useEffect, useState } from "react";
import './dashboard.css';
function Dashboard() {
    let [name, setname] = useState("");
    let [collage, setcollagename] = useState("");
    let [gender, setgender] = useState("")
    let [age, setage] = useState("")
    let [nameerror, setnameerror] = useState(false);
    let [collageerror, setcollageerror] = useState(false);
    let [gendererror, setgendererror] = useState(false);
    let [ageerror, setageerror] = useState(false)

    const save = (e) => {
        e.preventDefault();
        console.log("name", name)
        localStorage.setItem("setname", name)
        console.log("collage", collage)
        localStorage.setItem("collage", collage)
        console.log("gender", gender)
        localStorage.setItem("gender", gender)
        console.log("age", age)
        localStorage.setItem("age", age)
        const details = {
            name: name,
            collage: collage,
            gender: gender,
            age: age
        }
        localStorage.setItem("details", JSON.stringify(
            details))
        setname("");
        setgender("");
        setage("");
        setcollagename("");
    }

    useEffect(() => {
    
    }, []);
    const localcollage = localStorage.getItem('collage');
        console.log("localcollage", localcollage)
        const localgender = localStorage.getItem('gender');
        console.log("localgender", localgender)
        const localage = localStorage.getItem('age');
        console.log("localage", localage)



    return (
        <div>
    
            <Learn names={name} />
            <Home />
            <div>

                <form>
                    <label>Name<span style={name ? { color: "black" } : { color: "red" }}
                    >*</span></label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="enter a name"
                        onBlur={() => setnameerror(true)}
                    />
                    {nameerror && !name
                        && <p style={{ color: "red" }}>{"name is required"}</p>}
                    <br />
                    <label>Collage<span style={collage ? { color: "black" } : { color: "red" }} >*</span></label>
                    <input
                        id="collage"
                        value={collage}
                        onChange={(e) => setcollagename(e.target.value)}
                        placeholder="enter your collagename"
                        onBlur={() => setcollageerror(true)}
                    />
                    {collageerror && !collage
                        && <p style={{ color: "red" }}>{"please enter your collage name"}</p>
                    }
                    <br />
                    <label>Gender <span style={gender ? { color: "black" } : { color: "red" }}>*</span></label>
                    <input id="gender"
                        value={gender}
                        onChange={(e) => setgender(e.target.value)}
                        placeholder="enter your gender"
                        onBlur={() => setgendererror(true)}
                    />
                    {gendererror && !gender &&
                        <p style={{ color: "red" }}>{"male/female"}</p>
                    }
                    <br />
                    <label>Age <span style={age ? { color: "black" } : { color: "red" }}>*</span></label>
                    <input id="age"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        placeholder="enter your age"
                        onBlur={() => setageerror(true)}
                    />
                    {ageerror && !age &&
                        <p style={{ color: "red" }}>{"enter your age"}</p>}
                    <br />
                    <button onClick={save}>save</button>
                </form>
            </div>
        </div>
    )
}
export default Dashboard;