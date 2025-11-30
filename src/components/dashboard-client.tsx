'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropertyCard } from './property-card';
import { savedProperties, transactionHistory, type Property } from '@/lib/data';
import { format } from 'date-fns';
import { formatUsdAmount, formatCryptoAmount, CRYPTO_CURRENCIES } from '@/lib/crypto';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function DashboardClient() {

    return (
        <Tabs defaultValue="saved" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Saved Properties</CardTitle>
                        <CardDescription>Properties you've saved for later.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {savedProperties && savedProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedProperties.map(prop => prop && <PropertyCard key={prop.id} property={prop} />)}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">You have no saved properties.</p>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>Your past property purchases.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionHistory.map(tx => {
                                    const CryptoIcon = tx.property ? CRYPTO_CURRENCIES[tx.cryptoType as keyof typeof CRYPTO_CURRENCIES].Icon : null;
                                    return tx.property && (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-medium">{tx.property.title}</TableCell>
                                            <TableCell>{format(new Date(tx.date), 'MMM dd, yyyy')}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{formatUsdAmount(tx.amountUSD)}</span>
                                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        {CryptoIcon && <CryptoIcon className="w-3 h-3"/>}
                                                        {formatCryptoAmount(tx.amountCrypto)} {tx.cryptoType}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'}>{tx.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Profile Management</CardTitle>
                        <CardDescription>Update your personal and KYC information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <form className="space-y-4 max-w-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="Satoshi" />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Nakamoto" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="satoshi@gmx.com" />
                            </div>
                            <Button>Update Profile</Button>
                        </form>
                        <div className="space-y-4 max-w-lg border-t pt-8">
                             <h3 className="text-lg font-medium">KYC/AML Compliance</h3>
                             <p className="text-sm text-muted-foreground">To comply with regulations, please upload a form of government-issued ID.</p>
                             <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center">
                                <p className="mb-2">Drag and drop your ID here, or</p>
                                <Button variant="outline">Upload File</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
