const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="min-h-fit flex items-center justify-center pb-12 pt-24">
        <div className="max-w-[750px] w-full flex flex-col gap-6 items-start shadow-xl shadow-slate-200 rounded-md p-4 md:py-8  bg-white">
          {children}
        </div>
      </div>
    );
  };
  
  export default FormWrap;
  