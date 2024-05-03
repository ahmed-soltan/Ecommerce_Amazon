import { Rating } from "@mui/material";
import { Review } from "@prisma/client";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RatingComponent = ({ reviews }: { reviews: Review[] }) => {
  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review: Review) => {
    ratingCounts[review.rating]++;
  });

  const totalReviews: number = reviews.length;
  const ratingPercentages: { [key: number]: string } = {};

  for (let rating = 1; rating <= 5; rating++) {
    const percentage: number = (ratingCounts[rating] / totalReviews) * 100;
    ratingPercentages[rating] = percentage.toFixed(2);
  }

  const productRating =
    reviews.length>0 ?
    reviews.reduce((acc: any, item: any) => acc + item.rating, 0) /
      reviews.length : 0;

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h1 className="text-slate-800 text-xl font-medium">Customer Reviews</h1>
      <div className="flex items-center justify-start gap-2">
        <Rating value={productRating} readOnly />
        <h1 className="text-slate-800 font-medium text-lg">
          {productRating} Out of 5
        </h1>
      </div>
      <span className="text-slate-600 text-sm">
        {reviews.length} Global Rating
      </span>
      <div className="flex items-center gap-3 w-full flex-wrap my-2">
        <span className="text-cyan-600 text-sm">5 Stars</span>
        <div className="flex items-center gap-1 flex-wrap w-full">
          <Progress value={ratingPercentages>0 ? parseFloat(ratingPercentages[5]):0} />
          <span className="text-cyan-600 text-sm">
            {ratingPercentages>0 ? parseFloat(ratingPercentages[5]):0}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full flex-wrap my-2">
        <span className="text-cyan-600 text-sm">4 Stars</span>
        <div className="flex items-center gap-1 flex-wrap w-full">
          <Progress value={ratingPercentages>0 ? parseFloat(ratingPercentages[4]):0} />
          <span className="text-cyan-600 text-sm">
            {ratingPercentages>0 ? parseFloat(ratingPercentages[4]):0}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full flex-wrap my-2">
        <span className="text-cyan-600 text-sm">3 Stars</span>
        <div className="flex items-center gap-1 flex-wrap w-full">
          <Progress value={ratingPercentages>0 ? parseFloat(ratingPercentages[3]):0} />
          <span className="text-cyan-600 text-sm">
            {ratingPercentages>0 ? parseFloat(ratingPercentages[3]):0}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full flex-wrap my-2">
        <span className="text-cyan-600 text-sm">2 Stars</span>
        <div className="flex items-center gap-1 flex-wrap w-full">
          <Progress value={ratingPercentages>0 ? parseFloat(ratingPercentages[2]):0} />
          <span className="text-cyan-600 text-sm">
            {ratingPercentages>0 ? parseFloat(ratingPercentages[2]):0}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full flex-wrap my-2">
        <span className="text-cyan-600 text-sm">1 Stars</span>
        <div className="flex items-center gap-1 flex-wrap w-full">
          <Progress value={ratingPercentages>0 ? parseFloat(ratingPercentages[1]):0} />
          <span className="text-cyan-600 text-sm">
            {ratingPercentages>0 ? parseFloat(ratingPercentages[1]):0}%
          </span>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-cyan-600 text-sm">
            How customer reviews and ratings work
          </AccordionTrigger>
          <AccordionContent className="text-sm text-slate-600">
            Customer Reviews, including Product Star Ratings help customers to
            learn more about the product and decide whether it is the right
            product for them. To calculate the overall star rating and
            percentage breakdown by star, we don&apos;t use a simple average.
            Instead, our system considers things like how recent a review is and
            if the reviewer bought the item on Amazon. It also analyzed reviews
            to verify trustworthiness.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RatingComponent;
