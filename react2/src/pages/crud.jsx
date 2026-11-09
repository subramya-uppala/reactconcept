import { useEffect, useState } from "react";

function Crud() {
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState([]);
    const [count, setCount] = useState(0);
    const [loadError, setLoadError] = useState("");
    const [editingId, setEditingId] = useState(null);

    function resetForm() {
        setName("");
        setPhonenumber("");
        setEmail("");
        setEditingId(null);
    }

    async function fetchStudents() {
        try {
            const response = await fetch("https://api.elurucoders.online/api/students");
            if (!response.ok) {
                throw new Error(`Failed to load students (${response.status})`);
            }

            const data = await response.json();
            if (!Array.isArray(data.data)) {
                throw new Error("The students response is not a list");
            }

            setDetails(data.data);
            setCount(data.count || data.data.length);
            setLoadError("");
        } catch (error) {
            setLoadError(error.message);
        }
    }

    async function save() {
        try {
            const url = editingId
                ? `https://api.elurucoders.online/api/students/${editingId}`
                : "https://api.elurucoders.online/api/students";

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone: phonenumber
                })
            });

            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }

            const data = await response.json();
            alert(data.message || ( "updated successfully" ));
            resetForm();
            await fetchStudents();
        } catch (error) {
            alert(error.message || "Something went wrong");
        }
    }

    async function handleDelete(studentId) {
        try {
            const response = await fetch(`https://api.elurucoders.online/api/students/${studentId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Delete failed (${response.status})`);
            }

            const data = await response.json();
            console.log(data);
            await fetchStudents();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEdit(studentId) {
        try {
            const selectedStudent = details.find((student) => student._id === studentId);
            if (!selectedStudent) {
                return;
            }

            setName(selectedStudent.name || "");
            setPhonenumber(selectedStudent.phone || "");
            setEmail(selectedStudent.email || "");
            setEditingId(studentId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    async function submit(event) {
        event.preventDefault();
        await save();
    }

    return (
        <div>
            <h1>CRUD</h1>
            <form onSubmit={submit}>
                <div>
                    <label>name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="enter a name"
                    />
                </div>
                <div>
                    <label>phonenumber</label>
                    <input
                        value={phonenumber}
                        placeholder="enter your number"
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>email</label>
                    <input
                        value={email}
                        placeholder="enter your mail id"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">{editingId?'update':'save'}</button>
                    <button type="button" onClick={resetForm}>clear</button>
                </div>
                <div>
                    <header>
                        <h3>Details : {count}</h3>
                    </header>
                    {loadError && <p role="alert">{loadError}</p>}
                    <table border="2">
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>name</th>
                                <th>Phonenumber</th>
                                <th>email</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((users, index) => (
                                <tr key={users._id}>
                                    <td>{index + 1}</td>
                                    <td>{users.name}</td>
                                    <td>{users.phone}</td>
                                    <td>{users.email}</td>
                                    <td>
                                        <button type="button" onClick={() => handleDelete(users._id)}>
                                            delete
                                        </button>
                                        <button type="button" onClick={() => handleEdit(users._id)}>
                                            edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default Crud;