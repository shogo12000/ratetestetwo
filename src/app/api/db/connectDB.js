import mongoose from 'mongoose';

 
 
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log('✅ Já conectado ao MongoDB.');
        return;
    }
    
    try {
        console.log('🔗 Tentando conectar ao banco de dados...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexão ao MongoDB bem-sucedida!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);  
    }
};

export default connectDB;