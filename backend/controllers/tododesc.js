import {sql} from '../config/db.js';

export const addDescription = async(req,res) =>{
      const { description } = req.body;

      if(!description && description.trim() == ""){
        return res.status(400).json({message: "Description is required"});
      }

      try {
        const result = await sql`
        INSERT INTO todos (description)
        VALUES (${description})
        `
        res.status(201).json({ message: "Todo added", todo: result[0] });
      } catch (error) {
          console.error("Error adding todo:", error);
          res.status(500).json({ sucess:"false", message: "Internal server error" });
      }
};
export const getallTodo = async(req,res) =>{
    try {
        const result = await sql`
        Select * from todos
        ORDER BY created_at DESC
        `
        res.status(200).json({ sucess : true, todo: result });
    } catch (error) {
        console.log("error fetching todo" , error)
        res.status(500).json({ sucess:"false" ,message: "Internal server error" });
    }
};

export const updateTodo = async(req,res) =>{
    const { id } = req.params;
    const { description } = req.body;
    if(!description && description.trim() == ""){
        return res.status(400).json({message: "Description is required"});
    }
    try {
        const updatedProduct = await sql`
         UPDATE todos 
         SET description = ${description}
          WHERE id = ${id}
          RETURNING *;
        `
        console.log("TODO UPDATED SUCCESSFULLY" , updatedProduct);
        res.status(200).json({message: "Todo updated", todo: updatedProduct[0]})
    } catch (error) {
        console.log("Error Updating todos", error);
        res.status(500).json({ sucess:"false", message: "Internal server error" });
    }
}

export const DeleteTodo = async(req,res) =>{
    const { id } = req.params;
    try {
        const deletedtodo = await sql`
          DELETE from todos where id = ${id}
          Returning *;
        `
          if(deletedtodo.length == 0){
            return res.status(404).json({
                success: false,
                message: "Product not found"
                });
        }
        console.log("TODO DELETED")
        res.status(200).json({ sucess : true, todo : deletedtodo[0] });
    } catch (error) {
        console.log("Error deleting Todo",error);
        res.status(500).json({ sucess:"false" ,message: "Internal server error"})
    }
};
