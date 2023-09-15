const Product=require('../model/productSchema');


const allproductsstatic=async(req,res)=>{
    const product=await Product.find({"featured": true});
    res.status(200).json({product,hits:product.length});
}

const allproducts=async(req,res)=>{
    const {company,featured,name,sort,fields,numFilter}=req.query;
    const queryObject=new Object();

    if(company){
        queryObject.company=company;
    }
    if(featured){
        queryObject.featured=featured
    }
    if(name){
        queryObject.name={$regex: name, $options: 'i' }
    }
    if(numFilter){
        const opMap={
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte', 
            '=':'$eq'
        }
        const regEx=/<=|>=|<|>|=/g;
       
        let filter=numFilter.replace(regEx,(match)=>{
            return `-${opMap[match]}-`; 
         });
        
        const options=['price','rating'];
        filter=filter.split(',').forEach(ele => {
            const[field,op,value]=ele.split('-');
            if(options.includes(field)){
                queryObject[field]={[op]:value}
            }
        });
        
   }


    let result=Product.find(queryObject);
    if(sort){
        let sortList=sort.split(',').join(' ');
        result=result.sort(sortList);
    }
    else{
        result=result.sort('name');
    }
    if(fields){
        result=result.select(fields.split(',').join(' '));
    }
   

    const page=req.query.page || 1;                                                             
    const limit=req.query.limit || 7;
    const skip=(page-1)*limit;

    const product=await result.skip(skip).limit(limit);

    res.status(200).json({product,nbHits:product.length}); 
       
    
}

module.exports={allproducts,allproductsstatic}