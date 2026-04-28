import './styles.css'
export default function Contact(){
    return(
        <>
        <div id="contact">
        <div className="d-flex flex-column justify-column-center bg-secondary w-100 h-25 p-3">

        <p className="text-white">For any queries, e-mail us at</p>

        <div className="d-flex flex-row justify-content-center">
        <img src="/gmail-icon.png" className="icon-img"/>
        <p className="text-white">Orbit@fmail.com</p>

        </div>
        

        </div>

        </div>
        
        </>
    )
}