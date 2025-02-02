import PromptCard from "./PromptCard";

const ProfileCard = ({name,desc,data,handleEdit, handleDelete} : any)=>{
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>

      <div className='mt-10 prompt_layout'>
      {data.map((post: any)=> (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=> handleEdit && handleEdit(post)}
          handleDelete={()=> handleDelete && handleDelete(post)}
        />
      ))}

    </div>
    </section>
  )
}
export default ProfileCard;