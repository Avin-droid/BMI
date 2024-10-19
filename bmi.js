const express=require('express')
const path=require('path')
const ejs=require('ejs')
const PORT=2000
const SERVER=express()

SERVER.set('view engine','ejs')
SERVER.use(express.static('public'))

SERVER.get('/',(req,res)=>{
    res.render('Home')
})

SERVER.get('/info',(req,res)=>{
    res.render('GetInformation')
})

SERVER.get('/save',(req,res)=>{
    let name=req.query.nm
    let age=req.query.ag
    let weight=req.query.wt
    let height=req.query.ht
    let sex=req.query.gender

    if(age<0 || height<0 || weight<0)
    {
        res.send('Age Height and Weight Cannot be Negative')
    }

    if(!weight && !height && !age)
    {
        res.send('Please Enter Height Weight and Age to Calculate BMI ')
    }
    else
    {
        let height_in_metres=height/100
        let BMI=weight/(height_in_metres**2)
        BMI=BMI.toFixed(2)

        let category=''
        if(BMI<18.5)
        {
            category='UnderWeight'
        }
        else if(BMI>18.5 && BMI<=24.5)
        {
            category='Normal'
        }
        else if(BMI>24.5 && BMI<=30)
        {
            category='OverWeight'
        }
        else
        {
            category='Obessed'
        }

        res.render('DisplayBMI',{
            name:name,
            age:age,
            sex:sex,
            height:height,
            weight:weight,
            BMI:BMI,
            category:category,
        })
    }

})

SERVER.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})
