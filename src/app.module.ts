import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentReceivedModule } from './received/payments/payments.module';
import { CheckIssuedModule } from './check-issued/check-issued.module';
import { PendingApprovalModule } from './pending-approval/pending-approval.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { BrandingModule } from './branding/branding.module';
import { BankInfoModule } from './bank-info/bank-info.module';
import { CompanyLimitsModule } from './company-limits/company-limits.module';
import { FinancialReportsModule } from './financial-reports/financial-reports.module';
import { ExportModule } from './export-options/export-options.module';
import { UserRoleModule } from './user-roles/user-roles.module';
import { RecentActivityModule } from './recent-activity/recent-activity.module';
import { CompanySwitcherModule } from './company-switcher/company-switcher.module';
import { CheckModule } from './check/check.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PayeeModule } from './payee/payee.module';
import { BankAddModule } from './bank-add/bank-add.module';
import { ReceivePaymentModule } from './receive-payment/receive-payment.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InternationalBankModule } from './international-bank/international-bank.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AddPayeeSendLinkModule } from './addpayee-sendlink/addpayee-sendlink.module';
import { PayeeDetailsModule } from './payee-details/payee-details.module';
import { CategoryModule } from './category/category.module';
import { AddItemModule } from './add-item/add-item.module';
import { PlanModule } from './plan/plan.module';
import { CheckDraftModule } from './check-draft/check-draft.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { PaymentSettingsModule } from './payment-settings/payment-settings.module';
import { PaymentLinkModule } from './payment-link/payment-link.module';
import { CashExpenseModule } from './cash-expense/cash-expense.module';
import { DepositSlipModule } from './deposit-slip/deposit-slip.module';
import { AddaddressModule } from './addaddress/addaddress.module';
import { MailDocumentModule } from './mail-document/mail-document.module';
import { SubscriptionBillingModule } from './subscription-billing/subscription-billing.module';
import { AddCardModule } from './addcard/addcard.module';
import { TransferMoneyModule } from './transfer-money/transfer-money.module';
import { FundWalletModule } from './fund-wallet/fund-wallet.module';
import { VerificationModule } from './email/phone/verification/verification.module';
import { PayFromCreditModule } from './payfrom-credit/payfrom-credit.module';
import { PayFromWalletModule } from './payfrom-wallet/payfrom-wallet.module';
import { AddCreditCardModule } from './add-credit-card/add-credit-card.module';
import { BillModule } from './bill/bill.module';
import { TaxModule } from './tax/tax.module';
import { MultipleCheckModule } from './multiple-check/multiple-check.module';
import { BulkPayModule } from './bulk-pay/bulk-pay.module';
import { AddNewBankAccountModule } from './add-new-bank-account/add-new-bank-account.module';
import { CompanyManagementModule } from './company-management/company-management.module';
import { AddcompanyModule } from './addcompany/addcompany.module';
import { RequestCompanyModule } from './request-company/request-company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    AuthModule,
    UserModule,
    CompanyModule,
    DashboardModule,
    NotificationModule,
    PaymentReceivedModule,
    CheckIssuedModule,
    PendingApprovalModule,
    BankAccountModule,
    BrandingModule,
    BankInfoModule,
    CompanyLimitsModule,
    FinancialReportsModule,
    ExportModule,
    UserRoleModule,
    RecentActivityModule,
    CompanySwitcherModule,
    CheckModule,
    SubscriptionModule,
    PayeeModule,
    BankAddModule,
    ReceivePaymentModule,
    InvoiceModule,
    InternationalBankModule,
    UserProfileModule,
    AddPayeeSendLinkModule,
    PayeeDetailsModule,
    CategoryModule,
    AddItemModule,
    PlanModule,
    CheckDraftModule,
    AdminDashboardModule,
    PaymentSettingsModule,
    PaymentLinkModule,
    CashExpenseModule,
    DepositSlipModule,
    AddaddressModule,
    MailDocumentModule,
    SubscriptionBillingModule,
    AddCardModule ,
    TransferMoneyModule,
    FundWalletModule,
    VerificationModule,
    PayFromCreditModule,
    PayFromWalletModule,
    AddCreditCardModule,
    BillModule,
    TaxModule,
    MultipleCheckModule,
    BulkPayModule,
    AddNewBankAccountModule,
    CompanyManagementModule,
    AddcompanyModule,
    RequestCompanyModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}