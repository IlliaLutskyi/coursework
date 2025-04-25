import { formData } from "@/components/actor/ActorForm";
import connectDb from "@/lib/db";
import { Actor } from "@/models/actor";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData: formData = await req.json();
  try {
    await connectDb();
    const actor = await Actor.findByIdAndUpdate(id, {
      name: formData.name,
      biography: formData.biography,
      place_of_birth: formData.place_of_birth,
      birthday: formData.birthDay,
      profile_path: formData.profile_path,
      deathday: formData.deathday,
    });
    if (!actor) return Response.json("Actor was not found", { status: 404 });
    return Response.json(
      { message: "Edits was applied successfully" },
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
