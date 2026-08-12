import "./globals.css";
import Footer from "@/components/footer"

function Layout({children}){
  return <html  lang="en" className="scroll-smooth">
    <body >
      
      {children}

      <Footer/>      
    </body>
  </html>
}
export default Layout