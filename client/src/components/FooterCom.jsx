import { Footer, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { Link } from "react-router-dom";


export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 ">
        <div className="w-full max-w-7xl max-auto">
            <div className='grid w-full justify-between sm:flex md:grid-cols-1 gap-3'>
                <div className="mt-5">
                <Link
                  className='
                  text-xl font-bold sm:text-3xl dark:text-white' 
                  to={"/"}>
                      <span className='px-2 py-1 bg-gradient-to-r
                      from-indigo-500 to-blue-500 text-white rounded'>E&P</span>
                      Blog 
                </Link>
                </div>
            <div className="grid grid-cols-2 gap-20 mt-4 sm:grid-cols-3 sm:gap-10">
              <div>
                <FooterTitle title="About"/>
                <FooterLinkGroup col={true}>
                      <FooterLink>
                          why E&P
                      </FooterLink>
                      <FooterLink
                          href="https://cvbuilder.me/portfolio/430c9m"
                          target="_blank"
                      >
                          About me
                      </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Fllow Me"/>
                <FooterLinkGroup col={true}>
                      <FooterLink
                        href="https://github.com/POURNASIRI"
                        target="_blank"
                        
                      >
                          GitHub
                      </FooterLink>
                      <FooterLink
                          href="https://www.linkedin.com/in/erfan-pournasiri-masouleh"
                          target="_blank"
                      >

                          Linkdin
                      </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Contact Me"/>
                <FooterLinkGroup col={true}>
                      <FooterLink>
                          erfanpournasiri71@gmail.com
                      </FooterLink>
                      <FooterLink>
                          +98 939 142 88 68
                      </FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
            </div>
            <p className="mt-10 
            border-t-2 py-1
            text-center text-xs text-gray-500 dark:text-gray-300">© 2024 - All right reserved</p>
        </div>
    </Footer>
  )
}
