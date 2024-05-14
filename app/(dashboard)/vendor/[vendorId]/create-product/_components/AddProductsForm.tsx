"use client";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import Banner from "@/components/banner";
import ProductBrand from "./ProductBrand";
import ProductDiscount from "./ProductDiscount";
import ProductAvailabilty from "./ProductAvailabilty";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductColors from "./ProductColors";
import { Image } from "@prisma/client";
import ProductCategory from "./ProductCategory";
import {
  AccessibilityIcon,
  BellElectric,
  Book,
  Camera,
  Cpu,
  Film,
  Footprints,
  ForkliftIcon,
  Gamepad2Icon,
  Headphones,
  HeartPulseIcon,
  HomeIcon,
  LaptopIcon,
  PcCaseIcon,
  PhoneIcon,
  Shirt,
  Sofa,
  StoreIcon,
  ToyBrick,
  Tv2Icon,
  WatchIcon,
} from "lucide-react";
import { clothesSizes, shoesSizes } from "@/Utils/sizes";
import ProductSizes from "./ProductSizes";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductDetails from "./ProductDetails";

type AddProductsFormProps = {
  vendorId: string;
};

export const categories = [
  {
    label: "All",
    icon: StoreIcon,
  },
  {
    label: "Phones",
    icon: PhoneIcon,
  },
  {
    label: "Labtops",
    icon: LaptopIcon,
  },
  {
    label: "Desktop",
    icon: PcCaseIcon,
  },
  {
    label: "Watchs",
    icon: WatchIcon,
  },
  {
    label: "TVs",
    icon: Tv2Icon,
  },
  {
    label: "Accessories",
    icon: AccessibilityIcon,
  },
  {
    label: "Clothes",
    icon: Shirt,
  },
  {
    label: "Furnitures",
    icon: Sofa,
  },
  {
    label: "Home",
    icon: HomeIcon,
  },
  {
    label: "Kitchen",
    icon: ForkliftIcon,
  },
  {
    label: "Personal Care",
    icon: HeartPulseIcon,
  },
  {
    label: "video Games",
    icon: Gamepad2Icon,
  },
  {
    label: "Shoes",
    icon: Footprints,
  },
  {
    label: "Movies",
    icon: Film,
  },
  {
    label: "Books",
    icon: Book,
  },
  {
    label: "Electronics",
    icon: Cpu,
  },
  {
    label: "Head Phones",
    icon: Headphones,
  },
  {
    label: "Camera",
    icon: Camera,
  },
  {
    label: "Toys",
    icon: ToyBrick,
  }
];

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  price: z.string().min(1, {
    message: "Product price must be at least 1.",
  }),
  category: z.string(),
  description: z.string().min(3, {
    message: "Product description must be at least 3 characters.",
  }),
  brand: z.string().min(3, {
    message: "Product description must be at least 3 characters.",
  }),
  details:z.string(),
  inStock: z.boolean(),
  discount: z.string(),
});
const AddProductsForm = ({ vendorId }: AddProductsFormProps) => {
  
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<
    {
      color: string;
      colorCode: string;
      image: string | null;
    }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      details:"",
      brand: "",
      inStock: false,
      discount: "",
    },
  });
  const router = useRouter();
  const { getValues } = form;
  const { isSubmitting, isValid } = form.formState;

  const handleAddImage = (item: {
    color: string;
    colorCode: string;
    image: string | null;
  }) => {
    setImages((prevImages) => (prevImages ? [...prevImages, item] : [item]));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  const category = form.watch("category");

  const requiredField = [
    getValues("name"),
    getValues("description"),
    getValues("price"),
    category,
    images.length > 0,
    category === "Clothes" || category === "Shoes" ? sizes.length > 0 : true,
  ];
  const onClick = (size: string) => {
    if (sizes.includes(size)) {
      // If the size is already in the array, remove it
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      // If the size is not in the array, add it
      setSizes((prev) => [...prev, size]);
    }
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(() => {
    console.log(sizes);
  }, [sizes]);

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredField.every(Boolean);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const productData = {
      ...data,
      sizes: sizes,
      images: images,
      vendorId: vendorId,
    };
    try {
      await axios.post(`/api/vendors/${vendorId}/products`, productData);
      toast.success("Product Created successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      router.push(`/vendor/${vendorId}/manage-products`);
    }
  };
  return (
    <>
      {!form.getValues("inStock") && (
        <Banner
          variant={"warning"}
          label="This Product is not in Stock. It will not be Visible to your Customer"
        />
      )}
      <div className="p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Product Creation</h1>
          <span className="text-sm text-slate-700">
            Compelete All Fields {completionText}
          </span>
          <Separator />
        </div>
        <Form {...form}>
          <form
            className="space-y-4 w-full mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ProductTitle form={form} />
            <ProductDescription form={form} />
            <ProductDetails form={form} />
            <ProductPrice form={form} />
            <ProductBrand form={form} />
            <ProductDiscount form={form} />
            <div className="w-full font-medium ">
              <div className="mb-2 font-medium text-md ">Select Categoy</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                  if (item.label === "All") return null;
                  return (
                    <div key={item.label}>
                      <ProductCategory
                        label={item.label}
                        icon={item.icon}
                        onClick={(category: string) =>
                          form.setValue("category", category)
                        }
                        selected={category === item.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {category === "Clothes" && (
              <div className="w-full font-medium ">
                <div className="mb-2 font-medium ">
                  Select a {category} Size
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                  {clothesSizes.map((size) => {
                    return (
                      <div key={size.label}>
                        <ProductSizes
                          label={size.label}
                          onClick={onClick}
                          value={size.value}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {category === "Shoes" && (
              <div className="w-full font-medium ">
                <div className="mb-2 font-medium ">
                  Select a {category} Size
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto">
                  {shoesSizes.map((size) => {
                    return (
                      <div key={size.label}>
                        <ProductSizes
                          label={size.label}
                          onClick={onClick}
                          value={size.value}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <ProductAvailabilty form={form} />
            <ProductColors
              handleAddImage={handleAddImage}
              images={images}
              handleRemoveImage={handleRemoveImage}
            />
            <Button
              variant={"amazonBtn"}
              disabled={!isComplete || !isValid || isSubmitting}
            >
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProductsForm;
