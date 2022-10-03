import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'teemo';
const CONFIG:jwt.SignOptions = { expiresIn: '10d', algorithm: 'HS256' };

class LoginService {
  private model = userModel;

  login = async (email: string, password: string) => {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const compare = await bcrypt.compare(password, user.password);
    // console.log('AQUIIIIIIIIIIIIIIIII', compare);

    if (!compare) {
      throw new Error('Incorrect email or password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, CONFIG);

    return token;
  };

  validate = async (userId: number) => {
    const user = await this.model.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('user not found');
    }

    return user.role;
  };
}

export default LoginService;
