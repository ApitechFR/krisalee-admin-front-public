import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { serviceUpDTO } from '../../Models/serviceUp-dto';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { ServicesService } from '../../Services/services/services.service';
import { interval } from 'rxjs';
import { finalize, switchMap, takeWhile, timeout } from 'rxjs/operators';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { ErrorHandlerService } from '../../Services/errorHandler/error-handler.service';
import { ConfirmModalComponent } from '../../admin/dashboard/status-card/confirm-modal/confirm-modal.component';
import { environment } from '../../../environments/environment';
import { OrganizationsService } from '../../Services/organizations/organizations.service';
import { ConnectorService } from '../../Services/Connector/connector.service';
import { ServiceFormComponent } from './management-component/service-form/service-form.component';
import { ServiceDTO } from '../../Models/serviceAdd-dto';
import { ProductFormComponent } from './management-component/product-form/product-form.component';
import { ProductDTO } from '../../Models/product/productAdd-dto';
import { ProductService } from '../../Services/product/product.service';
import { VersionDTO } from '../../Models/version/versionAdd-dto';
import { VersionFormComponent } from './management-component/version-form/version-form.component';
import { AddOrgVersionFormComponent } from './management-component/add-org-version-form/add-org-version-form.component';
import { addOrganizationToVersionDTO } from '../../Models/version/add_organization_to_version-dto';
import { UnassignOrgVersionFormComponent } from './management-component/unassign-org-version-form/unassign-org-version-form.component';
import { SuccessHandlerService } from '../../Services/successHandler/success-handler.service';
import { OrganizationFormComponent } from './management-component/organization-form/organization-form.component';
import { Organization } from '../../Models/organization/entities/organization.entity';
import { OrganizationEnv } from '../../Models/organization/entities/organizationEnv.entity';
import { ServicesUrl } from '../../Models/organization/entities/ServicesUrl.entity';
import { ServicesCredentials } from '../../Models/organization/entities/ServicesCredentials.entity';
import { UpdateOrganizationFormComponent } from './management-component/update-organization-form/update-organization-form.component';

@Component({
  selector: 'ngx-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit{

    /** a variable storing the Client identifier */
    organization_id: string = environment.ORGANIZATION_ID;

    /** some action that we will wait untill it's done */
    actionRunning: boolean;

    /** a variable holding the list of services */
    services: any;

    /** a variable holding the list of organizations */
    organizations: any;

    /** a variable holding the list of connectors */
    connectors: any;

    /** a variable holding the list of connectors */
    products: any;

    /** a bool variable set to true while renewing ssl certifs, and false otherwise */
    renewing: boolean;

  constructor(
    private menuService: NbMenuService, 
    private serviceService: ServicesService,
    private dialogService: NbDialogService, 
    private errorhandler: ErrorHandlerService,
    private organizationService: OrganizationsService,
    private connectorService: ConnectorService,
    private productService: ProductService,
    private successHandler: SuccessHandlerService
    ) { }
    ngOnInit(): void {

      /** get the list of services */
      this.serviceService.GetAllServices(this.organization_id).subscribe(response =>  {
        this.services = response;
      })

       /** get the list of products */
       this.productService.getAllProducts(this.organization_id).subscribe(response =>  {
        this.products = response;
      })

      /** get the list of organizations */
      this.organizationService.getOrganizations(this.organization_id)
            .subscribe((response) =>{
              this.organizations = response;
            })

      /** get the list of connectors */
      this.connectorService.GetConnectors(this.organization_id).subscribe(response => {
        this.connectors = response;
      })
    }


  /**
   * delete all the backups existing on the system but do not exist on database
   */
  purge(){
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: 'Êtes-vous sûr de vouloir nettoyer les sauvegardes ?',
          Action: 'Nettoyer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if (formData) {
        this.serviceService.purgeSnapshots(this.organization_id)
        .subscribe((response) => {
          location.reload();
          // this.launchSuccess('backups cleaned successfully');          
        }, error => {
          this.errorhandler.handleError(error);
        })
      }
    })
  }

/**
 * import backup from filesystem to database
 */
  importSnapshots(){
    this.actionRunning = true;
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: 'Voulez-vous importer les sauvegardes ?',
          Action: 'Importer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if (formData) {
        this.serviceService.importSnapshots(this.organization_id)
        .subscribe((response) => {
          location.reload();
          // this.launchSuccess('Snapshots cleaned successfully');          
        }, error => {
          this.errorhandler.handleError(error);
        })
      }
    })
  }

  /* 
      ###################
      Services Management
      ###################
  */

  addService(service?: any){
    this.dialogService.open(ServiceFormComponent).onClose.subscribe((formData) => {
      if(formData){
        const serviceDto : ServiceDTO = {
          name: formData.name,
          description: formData.description
        }
        this.serviceService.addNewService(this.organization_id, serviceDto).subscribe((response) =>{
          this.services.push(response);
          //TODO add the function here for creating a new product
        })
      }
    })
  }

  deleteService(service: any){
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: `Êtes-vous sûr de vouloir supprimer le service ${service.name} ?`,
          Action: 'Supprimer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if(formData) {
        this.serviceService.deleteService(this.organization_id, service.service_id)
        .subscribe(response => {
          this.deleteServiceFromList(service.service_id);
        });
      }
    })
  }

  /**
   * update the list of services when it get updated after http operations
   */
  UpdateServices(objects: any){
    this.services = this.services.map(service => objects.find(o => o.service_id === service.service_id) || service);
  }

  /**
   * delete a service from the array of service (mainly implemented for performing delete operations to make objects up to date in client side)
   */
  deleteServiceFromList(service_id: string){
    this.services = this.services.filter(service => service.service_id !== service_id);
  }

  /* 
      ###################
      Products Management
      ###################
  */

  addProduct(service_id?: string){
    this.dialogService.open(ProductFormComponent,
      { context:
        {
          services: this.services,
          organizations: this.organizations
        }
      }).onClose.subscribe((formData) => {
      if(formData){
        //sometimes the service_id is not specified when we create a new product to an existing service
        if(!service_id){
          service_id = formData.service_id
        }
        const productDto : ProductDTO = {
          name: formData.name,
          description: formData.description,
          service_id: service_id,
          organizations: formData.organizations,
          depends_on: formData.depends_on,
        }
        this.productService.createProduct(this.organization_id, service_id, productDto).subscribe((response) =>{
          this.products.push(response);
        })
      }
    })
  }

  deleteProduct(product: any){
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: `Êtes-vous sûr de vouloir supprimer le produit ${product.name} ?`,
          Action: 'Supprimer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if(formData) {
        this.productService.deleteProduct(this.organization_id, product.service_id, product.product_id)
        .subscribe(response => {
          this.deleteProductFromList(product.product_id);
        });
      }
    })
  }

  /**
  * update the list of products when a product get updated after http operations
  */
     UpdateProducts(objectToReplace: any){
      this.products = this.products.map(product => {
        return (objectToReplace.product_id == product.product_id)?   objectToReplace : product;
      })
    }

  /**
   * delete a product from the array of products (mainly implemented for performing delete operations to make objects up to date in client side)
   */
  deleteProductFromList(product_id: string){
    this.products = this.products.filter(product => product.product_id !== product_id);
  }

  /* 
      #####################
      Connectors Management
      #####################
  */

  addConnector(){
    console.log(`adding a connector`);
  }

  deleteConnector(connector : any){
    console.log(`deleting the connector ${connector.name}`)
  }

  /* 
      ########################
      Organizations Management
      ########################
  */

    addOrganization(){
      this.dialogService.open(OrganizationFormComponent,
        { context:
          {
          }
        }).onClose.subscribe((formData) => {
        if(formData){
          const servicesUrl = new ServicesUrl(formData.auth, formData.mail, formData.drive, formData.website, formData.chat);
          const servicesCrendentials = new ServicesCredentials(formData.NEXT_CLOUD_USERNAME, 
                                                                formData.NEXT_CLOUD_PASSWORD,
                                                                formData.MAILSERVER_POSTMASTER_USERNAME, 
                                                                formData.MAILSERVER_POSTMASTER_PASSWORD, 
                                                                formData.KC_SERVICE_ADMIN_USERNAME, 
                                                                formData.KC_SERVICE_ADMIN_PASSWORD);
          const organizationEnv = new OrganizationEnv(servicesUrl, servicesCrendentials,
                                                      formData.HOST_DATA_SSH_PORT,
                                                      formData.SFTP_HOST,
                                                      formData.SFTP_PORT,
                                                      formData.SFTP_USERNAME,
                                                      formData.SFTP_PASSWORD,
                                                      formData.KC_SERVICE_ADMIN_CLIENT_ID,
                                                      formData.KC_SERVICE_URL,
                                                      formData.ORG_DOMAIN
                                                    );
          const organization = new Organization(formData.name, false, organizationEnv);
          //envoie de la requete pour l'ajout d'une nouvelle organisation*
          this.organizationService.addOrganization(organization).subscribe((response) =>{
            this.organizations.push(response);
            this.successHandler.handleSuccess(`L'organisation ${organization.name} est ajouté avec succès`);
          })
        }
        }
        )
    }

    updateOrganization(org: Organization){
      this.dialogService.open(UpdateOrganizationFormComponent,
        { context:
          {
            organization: org,
          }
        }).onClose.subscribe((formData) => {
          if(formData){
            const servicesUrl = new ServicesUrl(formData.auth, formData.mail, formData.drive, formData.website, formData.chat);
            const servicesCrendentials = new ServicesCredentials(formData.NEXT_CLOUD_USERNAME, 
                                                                  formData.NEXT_CLOUD_PASSWORD,
                                                                  formData.MAILSERVER_POSTMASTER_USERNAME, 
                                                                  formData.MAILSERVER_POSTMASTER_PASSWORD, 
                                                                  formData.KC_SERVICE_ADMIN_USERNAME, 
                                                                  formData.KC_SERVICE_ADMIN_PASSWORD);
            const organizationEnv = new OrganizationEnv(servicesUrl, servicesCrendentials,
                                                        formData.HOST_DATA_SSH_PORT,
                                                        formData.SFTP_HOST,
                                                        formData.SFTP_PORT,
                                                        formData.SFTP_USERNAME,
                                                        formData.SFTP_PASSWORD,
                                                        formData.KC_SERVICE_ADMIN_CLIENT_ID,
                                                        formData.KC_SERVICE_URL,
                                                        formData.ORG_DOMAIN
                                                      );
            const organization = new Organization(formData.name, false, organizationEnv);
            organization.organization_id = org.organization_id;
            //envoie de la requete pour la modification d'une organisation*
            this.organizationService.updateOrganization(organization).subscribe((response) =>{
              this.updateOrganizations(response);
              this.successHandler.handleSuccess(`L'organisation ${organization.name} est mis à jour avec succès`);
            })
          }
        })
    }

    /**
  * update the list of organizations when an organization get updated after http operations
  */
    updateOrganizations(objectToReplace: any){
      this.organizations = this.organizations.map(organization => {
        return (objectToReplace.organization_id == organization.organization_id)?   objectToReplace : organization;
      })
    }



    deleteOrganization(organization: Organization){
      this.dialogService.open(ConfirmModalComponent,
        {
          context: {
            content: `Êtes-vous sûr de vouloir supprimer l'organisation ${organization.name} ?`,
            Action: 'Supprimer',
            headerIcon: 'fa-exclamation',
          },
        }
      ).onClose.subscribe((formData) => {
        if(formData) {
          this.organizationService.deleteOrganization(organization.organization_id)
          .subscribe(response => {
            this.deleteOrganizationFromList(organization.organization_id);
            this.successHandler.handleSuccess(`L'organisation ${organization.name} a été supprimé avec succès`);
          });
        }
      })
    }

    /**
   * delete an organization from the list of organizations (mainly implemented for performing delete operations to make objects up to date in client side)
   */
  deleteOrganizationFromList(organization_id: string){
    this.organizations = this.organizations.filter(organization => organization.organization_id !== organization_id);
  }

  /* 
      ########################
      Versions Management
      ########################
  */
    /**
     * a function that adds a version to a product
     * @param product the product for which we want to add a version
     */
      addVersion(product: any){
        this.dialogService.open(VersionFormComponent,
          { context:
            {
            }
          }).onClose.subscribe((formData) => {
          if(formData){
            const versionDto : VersionDTO = {
              name: formData.name,
              description: formData.description,
              node_pool: formData.node_pool,
            }
            this.productService.createVersion(this.organization_id, product, versionDto).subscribe(response => {
              this.UpdateProducts(response);
            })
          }
        })
      }

      /**
       * a function that removes a version from a product
       * @param event an object containing at the same time product object and the version to remove object 
       */
      deleteVersion(event: any){
        this.dialogService.open(ConfirmModalComponent,
          {
            context: {
              content: `Êtes-vous sûr de vouloir supprimer la version ${event.version.name} du produit ${event.product.name} ?`,
              Action: 'Supprimer',
              headerIcon: 'fa-exclamation',
            },
          }
        ).onClose.subscribe((formData) => {
          if(formData) {
            this.productService.deleteVersion(this.organization_id, event.product, event.version.version_id)
            .subscribe(response => {
              this.UpdateProducts(response);
            });
          }
        })
      }

      /**
       * a function that gives access to an organization to a product's version
       * @param content an object containing two objects(product and version)
       */
      affectOrganization(content: any){
        this.dialogService.open(AddOrgVersionFormComponent, 
          {
            context: {
              title: `Affectation d'une organization à ${content.version.name} du produit ${content.product.name}`,
              subTitle: `Choisissez une organization :`,
              organizations: this.getNonAffectedOrganizations(content.product, content.version.version_id),
              services: this.services,
            }
          }).onClose.subscribe(formData =>{
            if(formData){
              const addOrgTOVersionDto : addOrganizationToVersionDTO = {
                org_id: formData.organization_id,
                depends_on: formData.depends_on
              }
              this.productService.addOrganizationToVersion(this.organization_id, content.product, content.version.version_id, addOrgTOVersionDto)
                .subscribe((response) =>{
                  this.UpdateProducts(response);
                  this.successHandler.handleSuccess(`L'organization ${formData.organization_id} a eu accès à la version ${content.version.name} avec succès`)
                })
            }
          })

      }

      /**
       * a function that denies access of an organization to a product's version
       * @param content an object containing two objects(product and version)
       */
        unassignOrganization(content: any){
        this.dialogService.open(UnassignOrgVersionFormComponent, 
          {
            context: {
              title: `Retirer l'accès d'une(des) organization(s) à ${content.version.name} du produit ${content.product.name}`,
              subTitle: `Choisissez une organization :`,
              organizations: this.getAffectedOrganizations(content.product, content.version.version_id),
            }
          }).onClose.subscribe(formData =>{
            if(formData){
              this.productService.unassignOrganizationToVersion(this.organization_id, content.product, content.version.version_id, formData.organization_id)
                .subscribe((response) =>{
                  this.UpdateProducts(response)
                  this.successHandler.handleSuccess(`L'accès à la version ${content.version.name} a été retiré de l'organization ${formData.organization_id} avec succès`)
                })
            }
          })

      }

      /**
       * a function that search for the assigned organizations to a specific product's version
       * @param product 
       * @param version_id 
       * @returns the list of the assigned organizations
       */
      getAffectedOrganizations(product: any, version_id: string){
        let result: any[] = [];

        //retrieve organization_ids from org_versions objects with the version id equal to version_id
        const organization_ids_from_orgvs = product.organizations_versions.map(v => {
            if(v.version_id === version_id){
              return v.organization_id;
          }
        });

        //loop through our organization to retrieve the whole organizations based on the above organization_ids_from_orgvs result
        this.organizations.map((organization) =>{
          for(let org_id of organization_ids_from_orgvs){
            if(org_id === organization.organization_id){
              result.push(organization);
            }
          }
        })
        return result;
      }

      /**
       * a function that filter organizations, to show only non assigned organizations to a specific product's version
       * @param product 
       * @param version_id 
       * @returns 
       */
      getNonAffectedOrganizations(product: any, version_id:string,){
        let result: any[] = [];
        const org_versions = product.organizations_versions.filter(v => v.version_id === version_id);
        this.organizations.map(
          (organization) => {
            if(!organization.is_root){
              let exist: boolean = false;
              for (let org_version of org_versions){
                if(org_version.organization_id === organization.organization_id){
                  exist = true;
                  continue;
                }
              }
              if(!exist)
                result.push(organization)
            }
              })
              return result;
      }


  //##################################
  // ### RENEWING SSL CERTIFICATES ###
  //##################################

  // renewSSL(){
  //   this.renewing = true;
  //   this.serviceService.renewSSL(this.organization_id).subscribe(response =>{
  //     this.successHandler.handleError('les certificats ont bien été renouvelés');
  //     this.renewing = false;
  //   });
  // }
}
