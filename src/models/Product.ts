import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  images: string[];
  category: "core" | "voice" | "vision" | "solar" | "accessories";
  editions: { name: string; price: number; description: string }[];
  inStock: boolean;
  stockCount: number;
  specs: { label: string; value: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ["core", "voice", "vision", "solar", "accessories"],
      required: true,
    },
    editions: [
      {
        name: { type: String },
        price: { type: Number },
        description: { type: String },
      },
    ],
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
    specs: [{ label: { type: String }, value: { type: String } }],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);