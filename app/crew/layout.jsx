import NavBar from "@/components/NavBar"
import Styles from './page.module.css'


export default function CrewLayout({ children }) {
    return (
 
      <section className={`${Styles.section} h-full`}>
        {children}
      </section>
  
    )
  }