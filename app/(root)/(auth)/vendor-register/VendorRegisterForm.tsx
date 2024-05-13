"use client";
import { Separator } from "@/components/ui/separator";
import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step4 from "./_components/Step4";
import validator from "validator";
import { Profile, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const steps = [
  {
    id: "Step 1",
    name: "Business Information",
    fields: [
      "businessName",
      "companyRegistrationNumber",
      "country",
      "city",
      "government",
      "addressLine1",
    ],
  },
  {
    id: "Step 2",
    name: "Seller information",
    fields: ["username", "fullName", "email", "phoneNumber"],
  },
  {
    id: "Step 3",
    name: "Store",
    fields: ["storeName", "storeDescription"],
  },
];


const formSchema = z.object({
    businessName:z.string().min(3 , {
        message: "Name must be at least 3 characters.",
    }),
    companyRegistrationNumber:z.string().refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    country:z.string(),
    state:z.string(),
    city:z.string(),
    
    addressLine1:z.string().min(3, {
        message: "Address must be at least 3 characters.",
    }),

    username:z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    fullName:z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email:z.string().email("Please enter a valid email address"),
    phoneNumber:z.string().refine(validator.isMobilePhone, "Please enter a valid phone number!"),

    storeName:z.string().min(3,{
        message: "Store Name must be at least 3 characters.",
    }),
    storeDescription:z.string().min(3,{
        message: "Store Description must be at least 3 characters.",
    }),

})

type VendorRegisterFormProps = {
  user:User 
}

const VendorRegisterForm = ({user}:VendorRegisterFormProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [image , setImage] = useState('')
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            companyRegistrationNumber: "",
            country: "",
            city: "",
            state: "",
            addressLine1: "",

            username: "",
            fullName: "",
            email: "",
            phoneNumber: "",

            storeName: "",
            storeDescription: "",
        },
    })

    const {isSubmitting , isValid} = form.formState

    const handleSetImage = (image:string)=>{
      setImage(image)
    }

    const onSubmit =async (data:z.infer<typeof formSchema>)=>{
        console.log(data , image)
       try {
         const vendorData={
          ...data,
          storeLogo:image,
          userId:user.id
         }
         const response = await axios.post('/api/vendors' , vendorData)
         router.refresh()
         toast.success("Vendor Account Created Successfully")
         router.push(`/vendor/${response.data.id}/profile`)
       } catch (error) {
          console.log(error)
          toast.error("Something went wrong")
       }
    }
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
      };
    
      const handleNext = async () => {
        const fields = steps[activeStep].fields;
        const output = await form.trigger(fields as any, { shouldFocus: true });
    
        if (!output) return;
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        if (activeStep === steps.length - 1) {
          await form.handleSubmit(onSubmit)();
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

  return (
    <div className="flex flex-col items-start gap-3 bg-white p-3">
      <h1 className="font-medium text-slate-800 text-3xl">
        Create Your Selling Account
      </h1>
      <p className="text-truncate text-slate-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, nisi
        nobis assumenda debitis itaque est possimus.
      </p>
      <Separator/>
      <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label.id} {...stepProps}>
              <StepLabel {...labelProps}>{label.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Form {...form}>

          <form
            className="my-8 shadow-xl p-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {activeStep === 0 ? (
              <Step1 form={form}/>
            ) : activeStep === 1 ? (
              <Step2 form={form}/>
            ) : activeStep === 2 ? (
              <Step4 form={form} handleSetImage={handleSetImage}/>
            ) : null}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} disabled={isSubmitting}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </form>
          </Form>
        </Fragment>
      )}
    </Box>
    </div>
  );
};

export default VendorRegisterForm;
