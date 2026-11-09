function Learn({ names }) {
       const localname = localStorage.getItem('setname');
        console.log("names", names)
    return (
        <div>
            <h1>AI Acadamy</h1>
            <h2>05/11/26{names}</h2>
        </div>
    )
}

export default Learn