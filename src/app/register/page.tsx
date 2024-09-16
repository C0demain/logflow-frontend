export default function Register() {
    return (
      
        <div className="flex min-h-screen">
  
          <div className=" bg-gradient-to-r from-sky-700 to-sky-400  flex flex-col flex-auto justify-center items-center w-2/5 ">
            <div className="mb-44">
              <h1 className=" text-white font-bold text-[3rem]">JJM Log</h1>
              <p className="text-white text-[1.5rem]">Logística Integrada e Armazéns Gerais</p>
            </div>
          </div>
  
          <div className="bg-slate-100 flex flex-col flex-auto justify-center items-center ">
  
              <div className="mb-24 mr-32">
                <h1 className="mb-1 text-black font-bold text-[1.5rem]">Seja Bem Vindo!</h1>
                <p className="mb-14  text-black text-[1rem]"> Cadastre-se para começar.</p>
  
                <div>
                  <label className=" mb-6 bg-slate-200 input input-bordered rounded-full flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Nome Completo" />
                  </label>
  
                  <label className="mb-6 bg-slate-200 input input-bordered rounded-full flex  items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" />
                  </label>
                
                  <label className=" mb-6 bg-slate-200 input input-bordered rounded-full flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" value="password" />
                  </label>
  
                  <button className="  bg-sky-600 border-slate-400 text-white hover:bg-sky-600 btn btn-wide rounded-full">Registre-se</button>
              </div>
  
            </div>  
          </div>
          
        </div>
         
          
       
    );
  }
  