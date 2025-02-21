import { Link } from "react-router-dom";
import Style from './home.module.css'
const home = () => {
  return (
    <div className={`${Style.box} `}>
        <h1 className={`${Style.title}`}>Write It, Save It, Never Forget It</h1>
        <h2 className={`${Style.body}`}>Welcome to a distraction-free space where your thoughts and ideas take center stage. Here, you can effortlessly store and manage your notes without the clutter and noise of traditional apps. Whether you’re jotting down quick ideas, organizing study materials, or creating detailed plans, our clean and intuitive interface keeps you focused on what truly matters—your content. Say goodbye to chaos and hello to a seamless note-taking experience, where every idea is safe, organized, and just a click away.</h2>
        <Link to="/createnotes" className={`${Style.button} btn `}>Create new Notes</Link>
    </div>

  )
}

export default home
