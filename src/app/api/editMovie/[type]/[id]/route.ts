import { formData } from "@/components/review/MovieTab";
import connectDb from "@/lib/db";
import { Movie } from "@/models/movie";
import { Trailer } from "@/models/trailer";
import { TVshow } from "@/models/tvshow";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; type: "tv" | "movie" }> }
) {
  const { id, type } = await params;
  const formData: formData = await req.json();
  try {
    await connectDb();
    if (type === "movie") {
      const movie = await Movie.findByIdAndUpdate(id, {
        title: formData.title,
        poster_path: formData.poster,
        overview: formData.description,
        release_date: formData.release_date,
        backdrop_path: formData.backdrop_image,
      });
      if (movie) {
        await Trailer.findByIdAndUpdate(movie.trailer_id, {
          trailer_key: formData.trailer_key,
        });
      }
    } else {
      const tvshow = await TVshow.findByIdAndUpdate(id, {
        title: formData.title,
        poster_path: formData.poster,
        overview: formData.description,
        release_date: formData.release_date,
        backdrop_path: formData.backdrop_image,
      });
      if (tvshow) {
        await Trailer.findByIdAndUpdate(tvshow.trailer_id, {
          trailer_key: formData.trailer_key,
        });
      }
    }

    return Response.json(
      { message: "Changes was successfully applied" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: err instanceof Error ? err.message : "Could not save changes",
      },
      { status: 500 }
    );
  }
}
