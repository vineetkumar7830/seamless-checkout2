import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
class DynamicTexts {
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine1!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine2!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine3!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine4!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine5!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine6!: any;
}

@Schema({ _id: false })
class FeatureDynamicTexts {
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine1!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine2!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine3!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine4!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine5!: any;
}

@Schema({ _id: false })
class PlanFeature {
    @Prop({ type: String }) featureName!: string;
    @Prop({ type: String }) featureCode!: string;
    @Prop({ type: Number }) featureType!: number;
    @Prop({ type: Number }) featureCategoryType!: number;
    @Prop({ type: MongooseSchema.Types.Mixed }) planFeatureTransactionFee!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) quantity!: any;
    @Prop({ type: String }) featureDisplayText!: string;
    @Prop({ type: FeatureDynamicTexts }) featureDynamicTexts!: FeatureDynamicTexts;
}

export type SaaSPlanDocument = SaaSPlan & Document;

@Schema({ timestamps: true, collection: 'saas_plans' })
export class SaaSPlan {
    @Prop({ type: String, required: true, unique: true }) id!: string;
    @Prop({ type: String }) planName!: string;
    @Prop({ type: String }) planCode!: string;
    @Prop({ type: String }) planPrice!: string;
    @Prop({ type: Number }) anchorPrice!: number;
    @Prop({ type: String }) monthlyPrice!: string;
    @Prop({ type: String }) billIntervalUnit!: string;
    @Prop({ type: Number }) planCategoryType!: number;
    @Prop({ type: String }) planTransactionFee!: string;
    @Prop({ type: DynamicTexts }) planDynamicTexts!: DynamicTexts;
    @Prop({ type: [PlanFeature] }) planFeatures!: PlanFeature[];
    @Prop({ type: [MongooseSchema.Types.Mixed] }) freeAddonFeatures!: any[];
    @Prop({ type: Number }) freeCredit!: number;
}

export const SaaSPlanSchema = SchemaFactory.createForClass(SaaSPlan);
