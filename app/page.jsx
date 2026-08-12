import DepartmentInfoSection from "@/components/main/dept_info_sec"
import MainSection from "@/components/main/main_sec"
import MotivationSection from "@/components/main/motivation_sec"
import Nav from "@/components/nav"
function Page(){
  return <main className="scroll-smooth">
    <Nav/>
    <MainSection/>
    <DepartmentInfoSection/>
    <MotivationSection/>
  </main>

}
export default Page